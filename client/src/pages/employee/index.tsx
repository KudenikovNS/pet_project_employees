import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useGetEmpoyeeQuery, useRemoveEmpoyeeMutation } from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { Layout } from '../../components/layout';
import { Descriptions, Divider, Modal, Space } from 'antd';
import { CustomButton } from '../../components/custom-button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ErrorMessage } from '../../components/error-message';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-wirh-message';

export const Employee = () => {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModelOpen] = useState(false);
  const { data, isLoading } = useGetEmpoyeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmpoyeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Загрузка</span>
  }

  if (!data) {
    return <Navigate to='/' />
  }

  const showModel = () => {
    setIsModelOpen(true)
  }

  const hideModel = () => {
    setIsModelOpen(false)
  }

  const handelDeleteUser = async () => {
    hideModel();

    try {
      await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`)
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message)
      } else {
        setError('Неизвестная ошибка')
      }

    }
  }

  return (
    <Layout>
      <Descriptions title='Информация о сотруднике' bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Адресс" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {
        user?.id === data.userId && (
          <>
            <Divider orientation='left'>Действие</Divider>
            <Space>
              <Link to={`/employee/edit/${data.id}`}>
                <CustomButton shape='round' type='default' icon={<EditOutlined />}>
                  Редактировать
                </CustomButton>
              </Link>
              <CustomButton shape='round' danger onClick={showModel} icon={<DeleteOutlined />}>
                Удалить
              </CustomButton>
            </Space>
          </>
        )
      }
      <ErrorMessage message={error} />
      <Modal
        title="Подтвердить удаление"
        open={isModalOpen}
        onOk={handelDeleteUser}
        onCancel={hideModel}
        okText='Подтвердить'
        cancelText='Отменить'
      >
        Вы дейсвительно хотите удалить сотридуника из таблицы
      </Modal>
    </Layout >
  )
}
