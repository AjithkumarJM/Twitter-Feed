import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Button,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { getTwitterList } from '../../services/twitterSearch/index'
import './style.scss';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onSubmit = keyword => {
        const { search } = keyword;

        this.props.getTwitterList(search);
    }

    generateInput = field => {
        return (
            <input
                className="form-control form-control-sm twitter-input"
                type={field.type}
                placeholder={field.placeholder}
                disabled={field.disable}
                {...field.input}
            />
        )
    }

    render() {
        const { isOpen } = this.state;
        const { handleSubmit } = this.props;

        return (
            <div>
                <Navbar className="bg-white nav-styling" light expand="md">
                    <Container>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav navbar>
                                <NavItem className='nav-item-styling'>
                                    <NavLink to="/home"><i className='fa fa-home' /> Home</NavLink>
                                </NavItem>

                                <NavItem className='nav-item-styling'>
                                    <NavLink to="/moments"><i className='fa fa-bolt' /> Moments</NavLink>
                                </NavItem>

                                <NavItem className='nav-item-styling'>
                                    <NavLink to="/notifications"><i className='fa fa-bell' /> notifications</NavLink>
                                </NavItem>

                                <NavItem className='nav-item-styling'>
                                    <NavLink to="/messages"><i className='fa fa-envelope' /> Messages</NavLink>
                                </NavItem>
                            </Nav>

                            <Nav className='ml-auto' navbar>
                                <form className='mr-2 ' onSubmit={handleSubmit(this.onSubmit)}>
                                    <Field
                                        placeholder="Search Twitter"
                                        type="text"
                                        name="search"
                                        component={this.generateInput}
                                    />
                                </form>

                                <img src="src/assets/images/user.png" height="32" width="32" className='mr-2' />

                                <Button color="primary" className='btn-twitter' size="sm">Tweet</Button>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(reduxForm({
    // validate,
    form: 'twitterSearch',

})(connect(null, { getTwitterList })(Header)));