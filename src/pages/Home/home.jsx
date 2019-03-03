import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Spinner, Alert } from 'reactstrap'
import Linkify from 'react-linkify';
import _ from 'lodash';

import { getTwitterList } from '../../services/twitterSearch/index';
import './style.scss';

class Home extends Component {

  componentDidMount() {
    this.props.getTwitterList('IPL');

    this.timer = setInterval(() => this.props.getTwitterList('IPL'), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
  }

  parseDate = date => {
    return _.map(date.split(/\s+/).slice(1, 3), response => ` ${response}`)
  }

  parseText = text => {
    // let atWord = text.match(/(\bhttps\S+\b)/ig);

    // let finalText = atWord !== null ? _.map(atWord, response => {
    //   return text.replace(response, response)
    // }) : text

    return <Linkify>{text}</Linkify>;
  }

  renderList = value => {
    let list = value.map((response, index) => {
      const {
        text,
        user: { name, screen_name, profile_image_url, profile_banner_url },
        retweet_count,
        favorite_count,
        created_at
      } = response;

      return (
        <Card body className='mb-2 h-auto' key={index}>
          <div className="media">
            <img className="align-self-start mr-3 rounded-circle" src={profile_image_url} alt="profile image" />
            <div className="media-body">
              <div className='mt-0'>
                <span className="font-weight-bold">{name}</span>
                <span className='text-muted mr-2'>{`@${screen_name}`}</span>
                <span className='text-muted'>{this.parseDate(created_at)}</span>
              </div>
              <p>{this.parseText(text)}</p>
              <div>
                <img src={profile_banner_url} className="img-fluid" />
              </div>

              <div className='mt-3'>
                <span className='mr-4'><i className='fa fa-comment text-muted fa-1x' /></span>
                <span className='mr-4'><i className='fa fa-retweet text-muted fa-1x' /> {retweet_count}</span>
                <span className='mr-4'><i className='fa fa-heart text-muted fa-1x' /> {favorite_count}</span>
                <span className='mr-4'><i className='fa fa-envelope text-muted fa-1x' /></span>
              </div>
            </div>
          </div>
        </Card>
      )
    })

    return list;
  }

  render() {

    const { data, requesting } = this.props.twitterList;

    return (
      <div className='mt-5'>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <div className='text-center'>
              {requesting === false ? <img src="src/assets/images/twitter.png" height="40" width="40" className='mb-2' />
                : <Spinner color="primary" className='mb-2' />
              }
            </div>
            {data.statuses ?
              data.statuses.length !== 0 ? this.renderList(data.statuses) : <Alert color="info">There is no status to show</Alert>
              :
              <Alert color="info">There is no status to show</Alert>
            }
          </Col>
        </Row>
      </div >
    )
  }
}

function mapStateToProps({ twitterList }) {
  return { twitterList }
}

export default connect(mapStateToProps, { getTwitterList })(Home);
