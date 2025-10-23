
import "./howitwork.css";

const HowItWork = () => {
  return (
    <div className="howitwork-page py-4 my-4" p>
      {/* Hero Section */}
      <section className="hero text-center text-white py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">How Evangadi Forum Works</h1>
          <p className="lead mt-3">
            Connect, ask, and learn — our community thrives on shared knowledge and collaboration.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="getting-started py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Getting Started</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="step-card shadow-sm p-4 h-100">
                <div className="step-icon mx-auto mb-3">1</div>
                <h5 className="fw-semibold">Sign Up</h5>
                <p className="text-muted">
                  Create an account with your details to join the Evangadi community.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="step-card shadow-sm p-4 h-100">
                <div className="step-icon mx-auto mb-3">2</div>
                <h5 className="fw-semibold">Ask or Answer</h5>
                <p className="text-muted">
                  Post your questions or share your knowledge by answering others.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="step-card shadow-sm p-4 h-100">
                <div className="step-icon mx-auto mb-3">3</div>
                <h5 className="fw-semibold">Edit and delet</h5>
                <p className="text-muted">
                  you can edit your quastion and your response as well.and remove if you post unnecessary or duplicate quastion and response
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="guidelines py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Community Guidelines</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <ul className="list-group list-group-flush text-start">
                <li className="list-group-item">
                 Be respectful and kind to others.
                </li>
                <li className="list-group-item">
                   Ask clear, constructive questions.
                </li>
                <li className="list-group-item">
                   Upvote helpful answers to support others.
                </li>
                <li className="list-group-item">
                   Avoid spam, offensive language, or unrelated content.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta text-center text-white py-5">
        <div className="container">
          <h2 className="fw-bold">Ready to Contribute?</h2>
          <p className="mb-4">
            Join thousands of learners exchanging ideas every day.
          </p>
          <a href="/register" className="btn btn-light px-4 py-2 fw-semibold">
            Join Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default HowItWork;
