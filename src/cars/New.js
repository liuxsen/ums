import React from 'react';
import { Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class New extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.form)
    this.props.form.validateFields((err, values) => {
      console.log('values is', values);
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="车牌号"
        >
            {getFieldDecorator('license_number', {
              rules: [{
                required: true,
                message: 'Please input your name',
              }],
              initialValue: "",
            })(
              <Input placeholder="Please input your name" />
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="车架号"
        >
            {getFieldDecorator('gener_number', {
              rules: [{
                required: true,
                message: 'Please input your 车架号',
              }],
              initialValue: "",
            })(
              <Input placeholder="Please input your name" />
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="车型"
        >
            {getFieldDecorator('brand', {
              rules: [{
                required: true,
                message: 'Please input your 车型  ',
              }],
              initialValue: "ER30",
            })(
              <Select>
                <Option value="ER30">ER30</Option>
                <Option value="8848">8848</Option>
              </Select>
            )}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" style={{marginLeft: '21%'}}>
            确定
          </Button>
        </FormItem>


      </Form>

    )
  }
}

const WrappedCarNewForm = Form.create()(New);
export default WrappedCarNewForm;
