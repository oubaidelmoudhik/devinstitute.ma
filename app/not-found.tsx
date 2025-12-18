"use client";

export const dynamic = 'force-dynamic';

import Breacrumb from "./src/common/Breacrumb";
import Link from "next/link";
import Cta2Area from "./src/components/home/Cta2Area";

const ErrorArea = () => {
  return (
    <>
      <Breacrumb title="Error" subtitle="Error" />
      <div className="error-content text-center">
        <div className="divider"></div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <img
                  className="pb-2 dark-mode-404"
                  src="/assets/img/core-img/404.png"
                  alt=""
                />
                <img
                  className="pb-2 light-mode-404"
                  src="/assets/img/core-img/404-light.png"
                  alt=""
                />
              </div>
              <div className="section-heading mt-5">
                <h2 className="mb-4">Look Like You're Lost</h2>
                <p>
                  The link you followed probably broken or the page has been
                  removed
                </p>
                <Link href="/" className="btn btn-primary mt-5">
                  <span>BACK TO HOME</span>
                  <span>BACK TO HOME</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
      <Cta2Area />
    </>
  );
};

export default ErrorArea;