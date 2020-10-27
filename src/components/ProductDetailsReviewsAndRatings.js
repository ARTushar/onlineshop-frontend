import React from 'react';
import {
  Container,
  Row,
  Col,
  Progress,
} from 'reactstrap';
import StarIcon from '@material-ui/icons/Star';

function ProductDetailsReviewsAndRatings({ selectedProduct }) {
  const calculateAvgRating = () => {
    let avg_rating = 0;
    selectedProduct.reviews.map((rev) => {
      avg_rating += rev.rating;
    });
    if (selectedProduct.reviews.length > 0) {
      avg_rating = avg_rating / selectedProduct.reviews.length;
    }
    return avg_rating;
  };
  return (
    <div>
        <React.Fragment>
          <Row>
            <Container>
              <h6>Customer Reviews</h6>
              <Row>
                <Col xs={12} md={4} style={{ marginBottom: 10 }}>
                  <Container>
                    <Row style={{ fontSize: '28px', fontWeight: 400 }}>
                      {calculateAvgRating()}/5
										</Row>
                    <Row>
                      {Array(Math.round(parseFloat(calculateAvgRating())))
                        .fill()
                        .map((_, i) => (
                          <StarIcon
                            style={{
                              color: '#fdb900',
                              fontSize: '28px',
                            }}
                          ></StarIcon>
                        ))}
                    </Row>
                    <Row style={{ fontSize: '14px', fontWeight: 300 }}>
                      {selectedProduct.reviews.length} ratings
										</Row>
                  </Container>
                </Col>
                <Col xs={12} md={6}>
                  <Row>
                    {Array(5)
                      .fill()
                      .map((_, idx) => {
                        const count = selectedProduct.reviews.filter(
                          (rev) => rev.rating == 5 - idx
                        ).length;
                        const total = selectedProduct.reviews.length;
                        return (
                          <React.Fragment >
                            <Col xs={6} md={4}>
                              {Array(5 - idx)
                                .fill()
                                .map((_, i) => (
                                  <StarIcon
                                    style={{
                                      color: '#fdb900',
                                      fontSize: '18px',
                                    }}
                                  ></StarIcon>
                                ))}
                              {Array(idx)
                                .fill()
                                .map((_, i) => (
                                  <StarIcon
                                    style={{
                                      color: 'lightgray',
                                      fontSize: '18px',
                                    }}
                                  ></StarIcon>
                                ))}
                            </Col>
                            <Col xs={4} md={6}>
                              <Progress
                                value={(count * 100) / total}
                                color='warning'
                              />
                            </Col>
                            <Col xs={2} md={2}>
                              {count}
                            </Col>
                          </React.Fragment>
                        );
                      })}
                  </Row>
                </Col>
              </Row>
            </Container>
          </Row>
          <hr></hr>
        </React.Fragment>

      {selectedProduct &&
        selectedProduct.reviews.map((rev) => {
          return (
            <Container>
              <Row>
                <Col>
                  <Row>
                    {Array(rev.rating)
                      .fill()
                      .map((_, i) => (
                        // <span>🌟</span>
                        <StarIcon
                          style={{ color: '#fdb900', fontSize: '18px' }}
                        ></StarIcon>
                      ))}
                  </Row>
                  <Row>
                    <Col style={{ fontSize: 12, fontWeight: 300 }}>
                      by {rev.author.name}
                    </Col>
                  </Row>
                </Col>
                <Col xs={2} style={{ fontSize: 12, fontWeight: 300 }}>
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }).format(new Date(Date.parse(rev.createdAt)))}{' '}
                </Col>
              </Row>
              <Row>
                <span style={{ fontSize: 14, paddingTop: 10 }}>
                  {rev.description}
                </span>
              </Row>
              <hr></hr>
            </Container>
          );
        })}
    </div>
  );
}

export default ProductDetailsReviewsAndRatings;
