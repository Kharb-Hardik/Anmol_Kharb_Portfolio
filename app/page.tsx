"use client";
import Head from "next/head";
import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import type Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });
const TournamentTable = dynamic(() => import("../components/TournamentTable"));
const AnimatedSection = dynamic(() => import("../components/AnimatedSection"));

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 bg-gray-800 bg-opacity-80 rounded-full flex items-center justify-center shadow-md hover:bg-opacity-100 transition-colors"
    aria-label="Previous slide"
  >
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 bg-gray-800 bg-opacity-80 rounded-full flex items-center justify-center shadow-md hover:bg-opacity-100 transition-colors"
    aria-label="Next slide"
  >
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  </button>
);

const Home = () => {
  const sliderRef = useRef<Slider>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [formStatus, setFormStatus] = useState("idle");
  const [activeTournamentTab, setActiveTournamentTab] =
    useState("international");

  const videoUrls: string[] = [
    "https://www.youtube.com/embed/mPGLTQ64jPw",
    "https://www.youtube.com/embed/SStkrYjSObU",
    "https://www.youtube.com/embed/2imL5xkw_eU",
    "https://www.youtube.com/embed/GfLIRFpJXe8",
    "https://www.youtube.com/embed/RSA8Bi-1Ha0",
    "https://www.youtube.com/embed/ihhpLXLCsfA",
    "https://www.youtube.com/embed/5Y5jeab5ff0",
    "https://www.youtube.com/embed/BSFjiZxFDKQ",
    "https://www.youtube.com/embed/n9rqXT48IEY",
    "https://www.youtube.com/embed/onb0wRKsz40",
  ];

  const galleryImages = [
    {
      src: "/g1.jpg",
      alt: "Anmol Kharb celebrating a victory on the court",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      src: "/g2.jpg",
      alt: "Anmol Kharb posing with her gold medal",
      className: "",
    },
    {
      src: "/g3.jpeg",
      alt: "Anmol Kharb during a fast-paced rally",
      className: "md:row-span-2",
    },
    {
      src: "/g4.jpg",
      alt: "A candid shot of Anmol Kharb during training",
      className: "",
    },
    { src: "/g5.jpg", alt: "Anmol Kharb preparing to serve", className: "" },
    {
      src: "/g6.jpg",
      alt: "Action shot of Anmol Kharb at the net",
      className: "md:col-span-2",
    },
    {
      src: "/g7.jpg",
      alt: "Anmol Kharb smiling after winning a point",
      className: "",
    },
    {
      src: "/g8.jpg",
      alt: "Anmol Kharb smiling after winning a point",
      className: "",
    },
    {
      src: "/g9.jpg",
      alt: "Anmol Kharb smiling after winning a point",
      className: "",
    },
    {
      src: "/g10.jpg",
      alt: "Anmol Kharb smiling after winning a point",
      className: "",
    },
    {
      src: "/g11.jpg",
      alt: "Anmol Kharb smiling after winning a point",
      className: "",
    },
    {
      src: "/g12.jpg",
      alt: "Anmol Kharb smiling after winning a point",
      className: "",
    },
  ];

  const internationalTournaments = [
    {
      year: 2025,
      name: "Cameroon International Challenge",
      location: "Cameroon",
      result: "Runner Up",
    },
    {
      year: 2025,
      name: "Lagos International",
      location: "Lagos, Nigeria",
      result: "Quarter Finalist",
    },
    {
      year: 2024,
      name: "Badminton Asia Team Championship",
      location: "Malaysia",
      result: "Winner",
    },
    {
      year: 2024,
      name: "Guwahati Masters",
      location: "Guwahati, India",
      result: "Runner Up",
    },
    {
      year: 2024,
      name: "Belgium International Open",
      location: "Belgium",
      result: "Winner",
    },
    {
      year: 2024,
      name: "Poland International Open",
      location: "Poland",
      result: "Winner",
    },
    {
      year: 2024,
      name: "NMDC Telangana International challenge",
      location: "Telangana, India",
      result: "Semi Finalist",
    },
    {
      year: 2023,
      name: "Badminton Asia U-17 & U-15 Junior Championship",
      location: "Chengdu, China",
      result: "Participation",
    },
    {
      year: 2023,
      name: "Kotak India Junior International Series",
      location: "India",
      result: "Semi Finalist",
    },
    {
      year: 2023,
      name: "Badminton Asia Junior Championship U-19",
      location: "Yogyakarta, Indonesia",
      result: "Participation",
    },
    {
      year: 2022,
      name: "TOYOTA GAZOO Racing Badminton Asia U-17 & U-15 Junior Championship",
      location: "Thailand",
      result: "Participation",
    },
  ];

  const nationalTournaments = [
    {
      year: 2025,
      name: "38th National Games (Team Event: Haryana)",
      location: "Dehradun, Uttarakhand",
      result: "Winner",
    },
    {
      year: 2025,
      name: "38th National Games (Women Singles)",
      location: "Dehradun, Uttarakhand",
      result: "Winner",
    },
    {
      year: 2025,
      name: "All India Public Sector Badminton championship (AAI Team)",
      location: "Bangalore, Karnataka",
      result: "Winner",
    },
    {
      year: 2025,
      name: "National Public Sector Badminton championship (AAI Women Singles)",
      location: "Bangalore, Karnataka",
      result: "Winner",
    },
    {
      year: 2024,
      name: "Senior National Badminton Team Championship (Team Haryana)",
      location: "Bangalore, Karnataka",
      result: "Winner",
    },
    {
      year: 2024,
      name: "YONEX-SUNRISE All India Senior Badminton ranking tournament",
      location: "Jodhpur, Rajasthan",
      result: "Winner",
    },
    {
      year: 2024,
      name: "YONEX-SUNRISE Dr. Akhilesh Das Gupta Memorial All India Senior Ranking Badminton Tournament",
      location: "Lucknow",
      result: "Runner Up",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE 85th Senior National Badminton Championship",
      location: "Guwahati, Assam",
      result: "Winner",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE 46th Junior National Badminton Championship 2023(Singles)",
      location: "Bangalore",
      result: "Runner Up",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE 46th Junior National Badminton Championship 2023(Team Event: Haryana)",
      location: "Bangalore",
      result: "Winner",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE 35th Sub junior National Badminton Championship",
      location: "Hyderabad, Telangana",
      result: "Winner",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE 30th Smt. Krishna Khaitan Memorial All India Junior Ranking Badminton Tournament GS U19",
      location: "India",
      result: "Winner",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE 30th Smt. Krishna Khaitan Memorial All India Junior Ranking Badminton Tournament GD U19",
      location: "India",
      result: "Winner",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE All India Sub-Junior Badminton ranking tournament",
      location: "Jaipur, Rajasthan",
      result: "Winner",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE All India Junior Badminton ranking tournament",
      location: "Udaipur, Rajasthan",
      result: "Winner",
    },
    {
      year: 2023,
      name: "YONEX-SUNRISE All India Sub Junior Ranking",
      location: "Panchkula, Haryana",
      result: "Winner",
    },
    {
      year: 2022,
      name: "YONEX-SUNRISE 34th Sub–Junior National Badminton championship 2022 U-17",
      location: "Odisha",
      result: "Runner Up",
    },
    {
      year: 2022,
      name: "YONEX-SUNRISE 45th Junior National Badminton Championship",
      location: "Odisha",
      result: "Semi Finalist",
    },
    {
      year: 2022,
      name: "YONEX-SUNRISE 45th Junior National Badminton Championship (Team Event: Haryana)",
      location: "Odisha",
      result: "Runner Up",
    },
  ];

  const [visibleImages, setVisibleImages] = useState(7);

  const settings = {
    ref: sliderRef,
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 700,
    arrows: false,
    dots: false,
    centerPadding: "20%",
    autoplay: true,
    autoplaySpeed: 12000,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    cssEase: "linear",
    afterChange: (current: number) => setActiveSlideIndex(current),
    beforeChange: () => {
      const iframes =
        sliderRef.current?.innerSlider?.list?.querySelectorAll("iframe");
      iframes?.forEach((iframe) => {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"stopVideo","args":""}',
          "*"
        );
      });
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus !== "idle" || !formRef.current) return;
    setFormStatus("sending");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(
        () => {
          setFormStatus("sent");
          formRef.current?.reset();
        },
        () => {
          alert("Failed to send the message. Please try again.");
          setFormStatus("idle");
        }
      )
      .finally(() => {
        setTimeout(() => setFormStatus("idle"), 10000);
      });
  };

  return (
    <>
      <Head>
        <title>Anmol Kharb | Professional Badminton Athlete</title>
        <meta
          name="description"
          content="The official portfolio of Anmol Kharb, India's rising badminton star. Discover her journey, watch highlights, and view her achievements."
        />
        <meta
          name="keywords"
          content="Anmol Kharb, Badminton, India, Athlete, Professional Badminton, BWF, Indian Sport, Badminton Player"
        />
        <meta name="author" content="Anmol Kharb" />
        <link rel="canonical" href="https://yourwebsite.com/" />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta
          property="og:title"
          content="Anmol Kharb | Professional Badminton Athlete"
        />
        <meta
          property="og:description"
          content="The official portfolio of Anmol Kharb, India's rising badminton star."
        />
        <meta
          property="og:image"
          content="https://yourwebsite.com/og-image.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourwebsite.com/" />
        <meta
          property="twitter:title"
          content="Anmol Kharb | Professional Badminton Athlete"
        />
        <meta
          property="twitter:description"
          content="The official portfolio of Anmol Kharb, India's rising badminton star."
        />
        <meta
          property="twitter:image"
          content="https://yourwebsite.com/og-image.jpg"
        />
      </Head>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }
        .slick-list {
          overflow: visible;
        }
        .slick-track {
          display: flex;
          align-items: center;
        }
        .slick-slide {
          transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.9);
          opacity: 1;
        }
        .slick-slide.slick-center {
          transform: scale(1);
        }
      `}</style>
      
      <header className="fixed top-0 left-0 right-0 md:top-5 md:w-auto md:left-1/2 md:-translate-x-1/2 z-50">
        <nav className="bg-black/80 backdrop-blur-sm md:rounded-full shadow-lg px-4 py-2">
          <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-1 sm:gap-x-2 md:gap-x-4">
            <a
              href="#about"
              className="text-gray-300 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              ABOUT
            </a>
            <a
              href="#highlights"
              className="text-gray-300 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              HIGHLIGHTS
            </a>
            <a
              href="#gallery"
              className="text-gray-300 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              GALLERY
            </a>
            <a
              href="#tournament"
              className="text-gray-300 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              TOURNAMENTS
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              CONTACT
            </a>
          </div>
        </nav>
      </header>

      <main className="w-full min-h-screen flex flex-col bg-white text-gray-800 overflow-x-hidden">
        <section
          id="home"
          className="relative h-screen flex items-center justify-center text-center"
        >
          <div className="hidden md:block">
            <Image
              src="/bg-hero.png"
              alt="Hero background"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
          <div className="block md:hidden">
            <Image
              src="/bg-hero-mobile.png"
              alt="Hero background"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 max-w-3xl px-4 sm:px-6">
            <AnimatedSection>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                ANMOL KHARB
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-200 drop-shadow-md">
                Professional Badminton Athlete
              </p>
              <button className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                WORLD RANK #47
              </button>
            </AnimatedSection>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-50">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden md:grid md:grid-cols-3">
                <div className="md:col-span-1 relative h-80 md:h-full">
                  <Image
                    src="/avatar.jpeg"
                    alt="Headshot of Anmol Kharb, professional badminton athlete"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="md:col-span-2 p-8 md:p-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    ABOUT HER
                  </h2>
                  <p className="text-gray-600 mb-8">
                    At just 18, Anmol Kharb has already made a significant mark
                    on the world of professional badminton. She became a
                    national sensation after her pivotal role in India&apos;s
                    historic win at the Badminton Asia Team Championships. Known
                    for her fearless attitude and remarkable composure, Anmol is
                    one of the brightest rising stars in the sport.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
                    <div className="py-4 bg-gray-100 rounded-lg">
                      <p className="text-3xl font-bold text-gray-900">18</p>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                        Age
                      </p>
                    </div>
                    <div className="py-4 bg-gray-100 rounded-lg">
                      <p className="text-3xl font-bold text-gray-900">IND</p>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                        Country
                      </p>
                    </div>
                    <div className="py-4 bg-gray-100 rounded-lg">
                      <p className="text-3xl font-bold text-gray-900">#47</p>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                        Rank
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section id="highlights" className="py-20 bg-white">
          <AnimatedSection>
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block">
                  HIGHLIGHTS & INTERVIEWS
                </h2>
                <div className="w-24 h-1 bg-gray-800 mt-2"></div>
              </div>
              <SlickSlider {...settings}>
                {videoUrls.map((url, idx) => {
                  const isCenter = activeSlideIndex === idx;
                  return (
                    <div key={idx} className="px-3">
                      <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-2xl">
                        <iframe
                          className="w-full h-full"
                          src={`${url}?rel=0&enablejsapi=1${
                            isCenter ? "&autoplay=1" : ""
                          }`}
                          title={`Anmol Kharb Video Highlight ${idx + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                  );
                })}
              </SlickSlider>
              <div className="flex justify-center items-center mt-12">
                <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
                <div className="flex items-center gap-2.5 mx-9">
                  {videoUrls.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => sliderRef.current?.slickGoTo(i)}
                      className={`w-2.5 h-2.5 rounded-full border-2 border-gray-800 transition-colors ${
                        activeSlideIndex === i
                          ? "bg-gray-800"
                          : "bg-transparent"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <NextArrow onClick={() => sliderRef.current?.slickNext()} />
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section id="gallery" className="py-20 bg-gray-50">
          <AnimatedSection>
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block">
                  GALLERY
                </h2>
                <div className="w-20 h-1 bg-gray-800 mt-2"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
                {galleryImages.slice(0, visibleImages).map((img, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg shadow-lg overflow-hidden ${img.className}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              {visibleImages < galleryImages.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisibleImages((prev) => prev + 4)}
                    className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </section>

        <section id="tournament" className="py-20 bg-white">
          <AnimatedSection>
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block">
                  TOURNAMENT HISTORY
                </h2>
                <div className="w-24 h-1 bg-gray-800 mt-2"></div>
              </div>

              <div className="flex justify-center mb-8 space-x-2 md:space-x-4">
                <button
                  onClick={() => setActiveTournamentTab("international")}
                  className={`px-6 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
                    activeTournamentTab === "international"
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  International
                </button>
                <button
                  onClick={() => setActiveTournamentTab("national")}
                  className={`px-6 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
                    activeTournamentTab === "national"
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  National
                </button>
              </div>

              <div>
                {activeTournamentTab === "international" ? (
                  <TournamentTable tournaments={internationalTournaments} />
                ) : (
                  <TournamentTable tournaments={nationalTournaments} />
                )}
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section id="contact" className="py-20 px-6 md:px-20 bg-gray-50">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Connect & Inquire
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <a
                      href="https://instagram.com/kharb_anmol"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex items-center text-gray-600 hover:text-pink-600 transition-colors group"
                    >
                      <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
                      <span className="ml-1 group-hover:underline">
                        @kharb_anmol
                      </span>
                    </a>
                    <a
                      href="https://twitter.com/Kharbanmol"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="flex items-center text-gray-600 hover:text-blue-500 transition-colors group"
                    >
                      <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
                      <span className="ml-1 group-hover:underline">
                        @Kharbanmol
                      </span>
                    </a>
                  </div>
                  <p className="text-gray-600 pt-4">
                    For business inquiries, please use the form.
                  </p>
                </div>
              </div>

              <form
                ref={formRef}
                onSubmit={handleContactSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="w-full p-3 rounded-md bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-gray-800 outline-none"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded-md bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-gray-800 outline-none"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  className="w-full p-3 rounded-md bg-white border border-gray-300 text-gray-800 h-32 focus:ring-2 focus:ring-gray-800 outline-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {formStatus === "idle"
                    ? "Send Message"
                    : formStatus === "sending"
                    ? "Sending..."
                    : "Message Sent!"}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </section>

        <footer className="py-8 text-sm text-center text-gray-500 bg-white border-t border-gray-200">
          {`© ${new Date().getFullYear()} Anmol Kharb. All Rights Reserved.`}
        </footer>
      </main>
    </>
  );
};

export default Home;
