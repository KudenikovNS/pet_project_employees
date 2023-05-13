const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch {
    res.status(400).json({ message: "Не удалось получить сотрудников" });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.age || !data.adress) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch {
    console.log(err);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(400).json({ message: "Не удалось удалить сотрудника" });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch {
    res.status(400).json({ message: "Не получить редактировать сотрудника" });
  }
};

const employee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(employee);
  } catch {
    res.status(401).json({ message: "Не удалось редактировать сотрудника" });
  }
};

module.exports = { all, add, remove, edit, employee };
