import { Form, Input, Button, Message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import { APIFilter, API_SPORT, API_LANGUAGE } from '@/api';

const LoginPage = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onFinish = ({ account, password }) => {
    API_SPORT.post('user.login', '', {
      username: account,
      password,
    })
      .then(APIFilter)
      .then(async ({ token, info }) => {
        // const { project_list, role_list, select_project_list } = info;
        // if (project_list.length === 0) {
        //   Message.error('登录失败，请联系管理员为该账号添加项目！');
        //   return;
        // }
        // Message.success('登录成功');
        localStorage.account = account;
        localStorage.token = token;
        // const authList = await API_SPORT.get('user.module', '1', {}).then(APIFilter);
        // const projects = project_list.sort((a, b) => a.id - b.id);
        // const selectProjects = select_project_list.sort((a, b) => a.id - b.id);
        // const platforms = await API_LANGUAGE.get('platform', '', {}).then(APIFilter);
        // for (let i = 0; i < projects.length; i++) {
        //   projects[i].languages = await API_LANGUAGE.get('language.support', '', {
        //     project_id: projects[i].id,
        //   }).then(APIFilter);
        // }
        // localStorage.setItem('selectProjects', JSON.stringify(selectProjects));
        // localStorage.setItem('authList', JSON.stringify(authList));
        // localStorage.setItem('projects', JSON.stringify(projects));
        // localStorage.setItem('platforms', JSON.stringify(platforms));
        // localStorage.setItem('currentProject', projects[0]?.id);
        // setInitialState({
        //   ...initialState,
        //   selectProjects,
        //   currentProject: localStorage.getItem('currentProject') * 1,
        //   projects,
        //   platforms,
        //   authList,
        // });

        history.push('/');
      });
  };
  return (
    <div
      style={{
        background: '#eee',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Form
        size="large"
        onFinish={onFinish}
        style={{
          width: 600,
          margin: '200px auto',
          padding: '30px 60px',
          border: '1px solid #ccc',
          borderRadius: 10,
          background: '#fff',
        }}
      >
        <h1 style={{ marginBottom: 20 }}>34 体育管理后台</h1>
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: '请输入登录账号',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="登录账号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
