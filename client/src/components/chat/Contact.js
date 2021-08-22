import React from 'react';
import Avatar from 'components/Avatar';
import moment from 'moment';
import 'moment/locale/en';
moment.locale('en');
import { Badge } from 'reactstrap';

const Contact = props => (
    <div className="contact">
        <div>
            <Avatar src={props.contact.avatar} />
            {props.contact.status === true ? <i className='fa fa-circle online' /> : ''}
        </div>
        <div className="w-50">
            <div className="name">{props.contact.name}</div>
            <div className="small last-message">
                {props.message ? props.message.content : 'Click here to start chating'}
            </div>
        </div>
        <div className="flex-grow-1 text-right">
            <div className="small text-muted">
                {props.message ? moment(props.message.date).format("hh") : ''}
            </div>
            { props.unseen > 0 ? <Badge color="success">{props.unseen}</Badge> : ''}
        </div>
    </div>
);

export default Contact;