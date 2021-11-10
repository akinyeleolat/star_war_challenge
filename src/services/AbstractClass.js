import Error from '../utils/ErrorUtils';

/**
 * abstract type services
 * @class
 */
class AbstractClass {
  /**
   * constructor
   * @param {*} model
   */
  constructor(model) {
    if (this.constructor === AbstractClass) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.DataModel = model;
  }

  /**
   * get all object
   * @returns {object} all data
   */
  async getAll() {
    const dataList = await this.DataModel.findAll();

    if (!dataList || !dataList.length) {
      throw new Error('Data Error', 404, 'the required list does not exist');
    }
    return {
      success: true,
      data: dataList
    };
  }

  /**
   *  create data
   * @param {*} data data
   * @returns {object} data
   */
  async create(data) {
    const { name } = data;
    if (name !== undefined) {
      const dataValue = await this.DataModel.findOne({
        where: { name },
      });
      if (dataValue) {
        throw new Error('Data Error', 409, `${this.DataModel} does  exist`);
      }
    }

    const newDataValue = await this.DataModel.create(data);
    return {
      success: true,
      data: newDataValue
    };
  }

  /**
   *  create or find data by id, name
   * @param {*} data
   * @return {object} data
   */
  async find(data) {
    const { id, name } = data;
    let dataValue;

    if (id) {
      dataValue = await this.DataModel.findByPk(id);
      return {
        success: true,
        data: dataValue
      };
    }

    dataValue = await this.DataModel.findOne({
      where: { name },
    });

    if (!dataValue) {
      throw new Error('Data Error', 404, 'record does not exist');
    }
    return {
      success: true,
      data: dataValue
    };
  }

  /**
   *  filter the endpoint
   * @param {*} data
   * orderBy direction(ASC,DESC), default createdAt Desc
   * LIMIT(number of records), default 10
   * page(page navigation), default 1
   * condition
   * @return {object} data model
   */
  async findBy(data) {
    let {
      // eslint-disable-next-line prefer-const
      orderBy, direction, limit, page, ...condition
    } = data;
    if (limit === undefined) {
      limit = 10;
    }
    if (page === undefined) {
      page = 1;
    }
    let orderValue = ['createdAt', 'DESC'];

    if (orderBy !== undefined && direction !== undefined) {
      orderValue = [orderBy, direction];
    }

    const offset = 0 + (page - 1) * limit;

    const dataValue = await this.DataModel.findAndCountAll({
      offset,
      limit,
      order: [
        orderValue
      ],
      where: condition
    });

    const { count: totalItems, rows } = dataValue;

    if (!rows.length) {
      throw new Error('Data Error', 404, 'record does not exist');
    }
    const totalPages = Math.ceil(totalItems / limit);
    const pageSize = Number(limit);
    const currentPage = Number(page);

    return {
      success: true,
      data: rows,
      pageSize,
      currentPage,
      totalPages
    };
  }

  /**
  * update data
  * @param {*} data
  * @return {object} usertype
  */
  async update(data) {
    const { id } = data;
    const dataValue = await this.DataModel.findByPk(id);

    if (!dataValue) {
      throw new Error('Data Error', 404, 'record does not exist');
    }

    const updatedData = await this.DataModel.update(
      { ...data },
      { where: { id } }
    );
    if (updatedData) {
      const updatedDataValue = await this.DataModel.findByPk(id);
      return {
        success: true,
        data: updatedDataValue
      };
    }
  }

  /**
  * remove datatype
  * @param {*} data
  * @return {object} data
  */
  async delete(data) {
    const { id } = data;
    const dataValue = await this.DataModel.findByPk(id);

    if (!dataValue) {
      throw new Error('Data Error', 404, 'record does not exist');
    }

    const deletedData = await this.DataModel.destroy(
      { where: { id } }
    );
    if (deletedData) {
      return {
        success: true,
        data: `records with id ${dataValue.id} removed`
      };
    }
  }
}

export default AbstractClass;
