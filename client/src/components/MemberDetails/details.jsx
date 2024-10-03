import Card from 'react-bootstrap/Card';
import React from 'react';


import './details.css'
function Details({ data }) {

//  const { title, image, deployed_link, github } = data;

  return (
    <section className="details">
       
        <Card >
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              <div>{data.dob}</div>
                <div>{data.}</div>
            </Card.Text>

          </Card.Body>
        </Card>
    </section>
  )
}

export default Details;