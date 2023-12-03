function Navbar() {
  return (
    <div>
      <nav className="container py-0 mx-auto shadow-none layout-navbar">
        <div className="px-3 border-t lg:px-4 navbar lg:navbar-expand-lg lg:border-t-0">
          <div className="py-0 navbar-brand app-brand demo d-flex py-lg-2 me-4">
            <button
              className="px-0 border-0 navbar-toggler me-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="align-middle tf-icons mdi mdi-menu mdi-24px"></i>
            </button>
            <a href="landing-page.html" className="app-brand-link">
              <span className="app-brand-logo demo">
                <span style={{ color: " #666cff" }}>
                  <svg
                    width="268"
                    height="150"
                    viewBox="0 0 38 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.0944 2.22569C29.0511 0.444187 26.7508 -0.172113 24.9566 0.849138C23.1623 1.87039 22.5536 4.14247 23.5969 5.92397L30.5368 17.7743C31.5801 19.5558 33.8804 20.1721 35.6746 19.1509C37.4689 18.1296 38.0776 15.8575 37.0343 14.076L30.0944 2.22569Z"
                      fill="currentColor"
                    />
                    <path
                      d="M30.171 2.22569C29.1277 0.444187 26.8274 -0.172113 25.0332 0.849138C23.2389 1.87039 22.6302 4.14247 23.6735 5.92397L30.6134 17.7743C31.6567 19.5558 33.957 20.1721 35.7512 19.1509C37.5455 18.1296 38.1542 15.8575 37.1109 14.076L30.171 2.22569Z"
                      fill="url(#paint0_linear_2989_100980)"
                      fillOpacity="0.4"
                    />
                    <path
                      d="M22.9676 2.22569C24.0109 0.444187 26.3112 -0.172113 28.1054 0.849138C29.8996 1.87039 30.5084 4.14247 29.4651 5.92397L22.5251 17.7743C21.4818 19.5558 19.1816 20.1721 17.3873 19.1509C15.5931 18.1296 14.9843 15.8575 16.0276 14.076L22.9676 2.22569Z"
                      fill="currentColor"
                    />
                    <path
                      d="M14.9558 2.22569C13.9125 0.444187 11.6122 -0.172113 9.818 0.849138C8.02377 1.87039 7.41502 4.14247 8.45833 5.92397L15.3983 17.7743C16.4416 19.5558 18.7418 20.1721 20.5361 19.1509C22.3303 18.1296 22.9391 15.8575 21.8958 14.076L14.9558 2.22569Z"
                      fill="currentColor"
                    />
                    <path
                      d="M14.9558 2.22569C13.9125 0.444187 11.6122 -0.172113 9.818 0.849138C8.02377 1.87039 7.41502 4.14247 8.45833 5.92397L15.3983 17.7743C16.4416 19.5558 18.7418 20.1721 20.5361 19.1509C22.3303 18.1296 22.9391 15.8575 21.8958 14.076L14.9558 2.22569Z"
                      fill="url(#paint1_linear_2989_100980)"
                      fillOpacity="0.4"
                    />
                    <path
                      d="M7.82901 2.22569C8.87231 0.444187 11.1726 -0.172113 12.9668 0.849138C14.7611 1.87039 15.3698 4.14247 14.3265 5.92397L7.38656 17.7743C6.34325 19.5558 4.04298 20.1721 2.24875 19.1509C0.454514 18.1296 -0.154233 15.8575 0.88907 14.076L7.82901 2.22569Z"
                      fill="currentColor"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2989_100980"
                        x1="5.36642"
                        y1="0.849138"
                        x2="10.532"
                        y2="24.104"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopOpacity="1" />
                        <stop offset="1" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_2989_100980"
                        x1="5.19475"
                        y1="0.849139"
                        x2="10.3357"
                        y2="24.1155"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopOpacity="1" />
                        <stop offset="1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
              <span className="app-brand-text demo menu-text fw-bold ms-2 ps-1">
                Materialize
              </span>
            </a>
          </div>

          <div
            className="collapse navbar-collapse landing-nav-menu"
            id="navbarSupportedContent"
          >
            <button
              className="top-0 border-0 navbar-toggler text-heading position-absolute end-0 scaleX-n1-rtl"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="tf-icons mdi mdi-close"></i>
            </button>
            <ul className="p-3 navbar-nav me-auto p-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link fw-medium"
                  aria-current="page"
                  href="landing-page.html#landingHero"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium"
                  href="landing-page.html#landingFeatures"
                >
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium"
                  href="landing-page.html#landingTeam"
                >
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium"
                  href="landing-page.html#landingFAQ"
                >
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium text-nowrap"
                  href="landing-page.html#landingContact"
                >
                  Contact us
                </a>
              </li>
              <li className="nav-item mega-dropdown">
                <a
                  href="javascript:void(0);"
                  className="nav-link dropdown-toggle navbar-ex-14-mega-dropdown mega-dropdown fw-medium"
                  aria-expanded="false"
                  data-bs-toggle="mega-dropdown"
                  data-trigger="hover"
                >
                  <span data-i18n="Pages">Pages</span>
                </a>
                <div className="p-4 dropdown-menu">
                  <div className="row gy-4">
                    <div className="col-12 col-lg">
                      <div className="mb-2 h6 d-flex align-items-center mb-lg-3">
                        <div className="flex-shrink-0 avatar avatar-sm me-2">
                          <span className="rounded avatar-initial bg-label-primary">
                            <i className="mdi mdi-view-grid-outline"></i>
                          </span>
                        </div>
                        <span className="ps-1">Other</span>
                      </div>
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="pricing-page.html"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            <span data-i18n="Pricing">Pricing</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="payment-page.html"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            <span data-i18n="Payment">Payment</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="checkout-page.html"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            <span data-i18n="Checkout">Checkout</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="help-center-landing.html"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            <span data-i18n="Help Center">Help Center</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-lg">
                      <div className="mb-2 h6 d-flex align-items-center mb-lg-3">
                        <div className="flex-shrink-0 avatar avatar-sm me-2">
                          <span className="rounded avatar-initial bg-label-primary">
                            <i className="mdi mdi-lock-open-outline"></i>
                          </span>
                        </div>
                        <span className="ps-1">Auth Demo</span>
                      </div>
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-login-basic.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Login (Basic)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-login-cover.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Login (Cover)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-register-basic.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Register (Basic)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-register-cover.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Register (Cover)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-register-multisteps.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Register (Multi-steps)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-forgot-password-basic.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Forgot Password (Basic)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-forgot-password-cover.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Forgot Password (Cover)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-reset-password-basic.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Reset Password (Basic)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-reset-password-cover.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Reset Password (Cover)
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-lg">
                      <div className="mb-2 h6 d-flex align-items-center mb-lg-3">
                        <div className="flex-shrink-0 avatar avatar-sm me-2">
                          <span className="rounded avatar-initial bg-label-primary">
                            <i className="mdi mdi-image-outline"></i>
                          </span>
                        </div>
                        <span className="ps-1">Other</span>
                      </div>
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/pages-misc-error.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Error
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/pages-misc-under-maintenance.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Under Maintenance
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/pages-misc-comingsoon.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Coming Soon
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/pages-misc-not-authorized.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Not Authorized
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-verify-email-basic.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Verify Email (Basic)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-verify-email-cover.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Verify Email (Cover)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-two-steps-basic.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Two Steps (Basic)
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link mega-dropdown-link d-flex align-items-center"
                            href="../vertical-menu-template/auth-two-steps-cover.html"
                            target="_blank"
                          >
                            <i className="mdi mdi-radiobox-blank mdi-14px me-2"></i>
                            Two Steps (Cover)
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                      <div className="p-2 bg-body nav-img-col">
                        <img
                          src="../../assets/img/front-pages/misc/nav-item-col-img-light.png"
                          className="img-fluid scaleX-n1-rtl w-100"
                          alt="nav item col image"
                          data-app-light-img="front-pages/misc/nav-item-col-img-light.png"
                          data-app-dark-img="front-pages/misc/nav-item-col-img-dark.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium"
                  href="../vertical-menu-template/index.html"
                  target="_blank"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>
          <div className="landing-menu-overlay d-lg-none"></div>

          <ul className="flex-row navbar-nav align-items-center ms-auto">
            <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="javascript:void(0);"
                data-bs-toggle="dropdown"
              >
                <i className="mdi mdi-24px"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                <li>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0);"
                    data-theme="light"
                  >
                    <span className="align-middle">
                      <i className="mdi mdi-weather-sunny me-2"></i>Light
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0);"
                    data-theme="dark"
                  >
                    <span className="align-middle">
                      <i className="mdi mdi-weather-night me-2"></i>Dark
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="javascript:void(0);"
                    data-theme="system"
                  >
                    <span className="align-middle">
                      <i className="mdi mdi-monitor me-2"></i>System
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="../vertical-menu-template/auth-login-cover.html"
                className="px-2 btn btn-primary px-sm-4 px-lg-2 px-xl-4"
                target="_blank"
              >
                <span className="tf-icons mdi mdi-account me-md-1"></span>
                <span className="d-none d-md-block">Login/Register</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
