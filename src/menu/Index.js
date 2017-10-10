import AntMenu from './AntMenu'
import React from 'react';
import '../stylesheets/Menu.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Hello from '../Hello'
import asyncComponent from "../components/AsyncComponent";
import LocalTime from '../components/LocalTime'
import Until from '../until/Store'

import { Layout } from 'antd'
const { Sider, Content } = Layout;

const AsyncCustomer = asyncComponent(() => import("../Customer"));
const AsyncTool = asyncComponent(() => import("../Tool"));
const AsyncCar = asyncComponent(() => import("../Car"))
const AsyncCarNew = asyncComponent(() => import('../cars/New'));
const AsyncAbout = asyncComponent(() => import("../About"));
const AsyncNotFound = asyncComponent(() => import('../NotFound'))

class MainMenu extends React.Component {
  state = {
      collapsed: JSON.parse(Until.store("menuCollapsed"))  || false,
    };

    toggle = () => {
      Until.store("menuCollapsed", String(!this.state.collapsed))
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="sub-content">
                      <LocalTime />
                    </div>
                    <Layout>
                      <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        width={240}
                      >
                        <div className="logo" />
                        <AntMenu toggle={this.toggle} collapsed={this.state.collapsed} />
                      </Sider>
                      <Layout>
                        <Content>
                          <div>
                            <Switch>
                              <Route exact path="/" component={Hello}/>
                              <Route path="/customers" component={AsyncCustomer}/>
                              <Route path="/hello" component={Hello}/>
                              <Route path="/tool" component={AsyncTool}/>
                              <Route path="/about" component={AsyncAbout}/>
                              <Route exact path="/cars" component={AsyncCar}/>
                              <Route exact path="/cars/new" component={AsyncCarNew}/>
                              <Route exact component={AsyncNotFound}/>
                            </Switch>
                          </div>
                        </Content>
                      </Layout>
                    </Layout>
                </div>
            </Router>
        )
    }

}

export default MainMenu
