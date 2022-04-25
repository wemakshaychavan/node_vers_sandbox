module.exports = function (rawDbConnection, SequelizeLibrary) {
  return rawDbConnection.define(
    'postViewStats',
    {
      id: {
        type: SequelizeLibrary.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: SequelizeLibrary.UUIDV4,
      },
      userId: {
        type: SequelizeLibrary.UUID,
        allowNull: false,
      },
      postId: {
        type: SequelizeLibrary.UUID,
        allowNull: false,
      },
      createdAt: {
        type: SequelizeLibrary.DATE,
        defaultValue: SequelizeLibrary.NOW,
      },
    },
    {
      tableName: 'postViewStats',
      freezeTableName: true,
      indexes: [
        {
          fields: ['postId'],
        },
      ]
    }
  );
};
