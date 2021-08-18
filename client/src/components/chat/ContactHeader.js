import React from 'react';
import Avatar from 'components/Avatar';
import { Row } from 'reactstrap';

const ContactHeader = (props) => {
    return (
        <Row className="heading">
            <Avatar/>
            <div>contacts</div>
        </Row>
    )
}

export default ContactHeader;