import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import Myfetch from '../until/MyFetch';
import '../stylesheets/Button.css';
import "../stylesheets/cars/SearchForm.css";
import SearchFields from "./SearchField"
const FormItem = Form.Item;
const Option = Select.Option;
const API_URL = process.env.REACT_APP_DEV_API_URL


class SearchForm extends React.Component {
    state = {
        expand: false,
        searchParams: ""
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = []
            Object.keys(values).forEach(key => {
                params.push(`q[${key}]=${values[key]}`)
            })
            let result = params.join('&')
            console.log('Received values of form: ',JSON.stringify(values), params, result);
            Myfetch.all(`customers?${result}`).then(data => {
                this.setState({
                    searchParams: result
                })
                this.props.search(data, result)
            })
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const {expand} = this.state;
        this.setState({
            expand: !expand
        });
    }

    toNew = () => {
        this.props.history.push("/cars/new")
    }

    render() {
        return (
            <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
            >
                    <Row gutter={20}>{this.getFields()}</Row>
                    <Row>
                      <Col span={24} style={{
                                                textAlign: 'right'
                                            }}>
                        <Button icon="search" type="primary" htmlType="submit">搜索</Button>
                        <Button icon='edit' style={{
                                            marginLeft: 8
                                        }} onClick={this.handleReset}>
                          清除
                        </Button>
                        <Button type="dashed" onClick={this.toCsv} icon='export' style={{marginLeft: 8}}>导出</Button>

                        <Button className='skio-button-creator' onClick={this.toNew} style={{marginLeft: 8}} icon="plus">添加</Button>

                        <a style={{
                                        marginLeft: 8,
                                        fontSize: 12
                                    }} onClick={this.toggle}>
                          {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
                      </Col>
                    </Row>
                  </Form>
        )
    }

    toCsv = () => {
        window.location.href=`${API_URL}/customers.csv?${this.state.searchParams}`
    }


    // To generate mock Form.Item
    getFields() {
      const {getFieldDecorator} = this.props.form;
      const searchFields = [{key: "car_license_number_cont", value: '车牌号'}, {key: 'car_gener_eq', value: '车架号'}, {key: 'driver_name_cont', value: '司机姓名'}, {key: 'company_cont', value: '上牌单位'}]
      const formItemLayout = {
          labelCol: {
              span: 5
          },
          wrapperCol: {
              span: 19
          },
      };
      const children = [];
      searchFields.forEach((item, i) => {
          children.push(
              <Col span={6} key={i}>
                <FormItem {...formItemLayout} label={item['value']}>
                  {getFieldDecorator(item['key'], {
                      initialValue: ""
                  })(
                      <Input placeholder="请输入查找的内容" />
                  )}
                </FormItem>
              </Col>
          );
      })

      children.push(
        <Col span={6} key={children.length}>
          <FormItem
            {...formItemLayout}
            label="所属公司"
            hasFeedback
            validateStatus=""
          >
          {getFieldDecorator("company_name_cont", {
              initialValue: ""
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="1">小车东</Option>
              <Option value="2">路捷</Option>
              <Option value="3">睿博</Option>
            </Select>
          )}

          </FormItem>
        </Col>
      )

      children.push(
        <Col span={6} key={children.length}>
          <FormItem
            {...formItemLayout}
            label="城市"
            hasFeedback
            validateStatus=""
          >
          {getFieldDecorator("city_id_eq", {
              initialValue: ""
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="1">杭州</Option>
              <Option value="2">武汉</Option>
            </Select>
          )}

          </FormItem>
        </Col>
      )

      children.push(
        <Col span={6} key={children.length}>
          <FormItem
            {...formItemLayout}
            label="运营状态"
            hasFeedback
            validateStatus=""
          >
          {getFieldDecorator("yunying_status_eq", {
              initialValue: ""
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="1">备用车</Option>
              <Option value="2">试驾车</Option>
              <Option value="3">工作车</Option>
              <Option value="4">外界车辆</Option>
            </Select>
          )}

          </FormItem>
        </Col>
      )

      children.push(
        <Col span={6} key={children.length}>
          <FormItem
            {...formItemLayout}
            label="车辆状态"
            hasFeedback
            validateStatus=""
          >
          {getFieldDecorator("status_eq", {
              initialValue: ""
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="1">可发</Option>
              <Option value="2">不可发</Option>
            </Select>
          )}

          </FormItem>
        </Col>
      )

      children.push(
        <Col span={6} key={children.length}>
          <FormItem
            {...formItemLayout}
            label="网约车进度"
            hasFeedback
            validateStatus=""
          >
          {getFieldDecorator("wangyueche_jindu_eq", {
              initialValue: ""
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="1">已检测</Option>
              <Option value="2">已更改行驶证</Option>
            </Select>
          )}

          </FormItem>
        </Col>
      )

      children.push(
        <Col span={6} key={children.length}>
          <FormItem
            {...formItemLayout}
            label="是否过户"
            hasFeedback
            validateStatus=""
          >
          {getFieldDecorator("guohu_eq", {
              initialValue: ""
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="1">已过户</Option>
              <Option value="2">未过户</Option>
            </Select>
          )}

          </FormItem>
        </Col>
      )

      return children;
    }
}


const WrappedAdvancedSearchForm = Form.create()(SearchForm);
export default withRouter(WrappedAdvancedSearchForm);
