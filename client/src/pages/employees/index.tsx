import { PlusCircleOutlined } from "@ant-design/icons"
import { CustomButton } from "../../components/custom-button"
import { Layout } from "../../components/layout"
import { Table } from "antd"
import { useGetAllEmpoyeesQuery } from "../../app/services/employees"
import type { ColumnsType } from "antd/es/table"
import { Employee } from "@prisma/client"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../paths"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useEffect } from 'react'

const colums: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: "Возраст",
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: "Адрес",
    dataIndex: 'adress',
    key: 'adress'
  },
]

export const Employees = () => {

  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const { data, isLoading } = useGetAllEmpoyeesQuery();

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  return (
    <Layout>
      <CustomButton type='primary' onClick={() => null} icon={<PlusCircleOutlined />}>
        Добавить
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={colums}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout >
  )
}
