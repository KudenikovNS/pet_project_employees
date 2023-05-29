import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Row } from "antd"
import { EmployeeForm } from "../../components/employee-form"
import { Layout } from "../../components/layout"
import { selectUser } from '../../features/auth/authSlice'
import { useAddEmpoyeeMutation } from '../../app/services/employees'
import { Employee } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/is-error-wirh-message'
import { Paths } from '../../paths'

export const AddEmployee = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [addEmployee] = useAddEmpoyeeMutation();


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()

      navigate(`${Paths.status}/created`)

      //navigate('/')

    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) {
        setError(err.data.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm
          title="Добавить сотрудника"
          btnText='Добавить'
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}
