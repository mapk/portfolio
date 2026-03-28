import NameWithBlob from "@/components/NameWithBlob";

export default function Home() {
  return (
    <main className="baseline-grid relative z-10 min-h-screen max-w-5xl pl-4 pr-4 md:pl-12 md:pr-12">
      <div className="portfolio-grid grid min-h-screen gap-0">
        <div className="portfolio-col-left w-full min-w-0 pt-12">
          <div className="animate-fade-in-up">
            <NameWithBlob />

            <p className="mb-12 text-sm">
              Founder of{" "}
              <a
                href="https://lastpicked.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Last Picked
              </a>
              , a product company using AI to learn, build, and iterate on
              ideas. I&apos;m also a Sr. Manager of Product Design at{" "}
              <a
                href="https://www.shopmonkey.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shopmonkey
              </a>{" "}
              where I integrated AI into our design process and built{" "}
              <a
                href="https://shopmonkey-playground.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shopmonkey Playground
              </a>{" "}
              to share early prototypes with customers. Previously, I led design
              teams at{" "}
              <a
                href="https://automattic.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Automattic
              </a>{" "}
              and{" "}
              <a
                href="https://wordpress.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WordPress
              </a>
              , and helped several startups go from 0 to 1.
            </p>
          </div>

          <section className="animate-fade-in-up animate-fade-in-up-delay-1">
            <ul className="space-y-0 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/in/uraine/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mapk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://adplist.org/mentors/mark-uraine"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ADPList
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="portfolio-col-right w-full min-w-0 pb-12">
          <section className="animate-fade-in-up animate-fade-in-up-delay-2">
            <h2 className="mb-6 text-sm uppercase">Projects</h2>
            <ul className="space-y-6 text-sm">
              <li>
                <a
                  href="https://tolkovanye.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tолкование
                  <br />
                  <span>Read insightful commentary on Bible verses.</span>
                </a>
              </li>
              <li>
                <a
                  href="https://worduponword.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Word Upon Word
                  <br />
                  <span>Learn Russian through comprehensible input.</span>
                </a>
              </li>
              <li>
                <a
                  href="https://eatyourgreens.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Eat Your Greens
                  <br />
                  <span>Track food nutrients by color.</span>
                </a>
              </li>
              <li>
                <a
                  href="https://hewalkswith.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  He Walks With Us
                  <br />
                  <span>Access books and articles with Hebraic context.</span>
                </a>
              </li>
              <li>
                <a
                  href="https://v0-yeshua-timeline.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Yeshua&apos;s Purpose
                  <br />
                  <span>Follow a timeline about the promised Messiah.</span>
                </a>
              </li>
              <li>
                <a
                  href="https://codepen.io/mapk/full/VwKeqeB"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  בריתות
                  <br />
                  <span>Review covenant details throughout history.</span>
                </a>
              </li>
              <li>
                <a
                  href="https://mapk.gumroad.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Typefaces
                  <br />
                  <span>A few typefaces I designed for the masses.</span>
                </a>
              </li>
            </ul>
          </section>

          <section className="mt-12 animate-fade-in-up animate-fade-in-up-delay-3">
            <h2 className="mb-6 text-sm uppercase">Talks</h2>
            <ul className="space-y-0 text-sm">
              <li>2025: The Influence of Language on Worldviews</li>
              <li>2024: Too Much Function, Not Enough Form</li>
              <li>2023: You say potato, I say GHOUGHPHTHEIGHTTEEAU</li>
              <li>2023: ECHOS Design Leadership Firesession</li>
              <li>
                <a
                  href="https://wordpress.tv/2020/05/30/mark-uraine-gutenberg-and-how-its-disrupting-wordpress/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2020: Disrupting Innovation
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=8R8x7Oj9f5w"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2019: Disrupting Innovation
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2019/09/08/mark-uraine-designing-in-the-open-remotely/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2019: Designing in the Open, Remotely
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2019/09/05/panel-growing-beyond-gutenberg-from-block-based-editing-to-site-administration/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2019: Panel Discussions: Growing Beyond Gutenberg
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2018/08/17/mark-uraine-designing-with-the-api-p1-of-3/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2018: Designing with the API
                </a>
              </li>
              <li>
                <a
                  href="https://europe.wordcamp.org/2017/session/workshop-visual-data-using-the-wordpress-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2017: Visual Data Using the WordPress API
                </a>
              </li>
              <li>
                <a
                  href="https://speakerdeck.com/mapk/visual-data-plus-computational-design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2017: Visual Data + Computational Design
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2017/05/09/mark-uraine-designing-in-the-open/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2017: Designing in the Open
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2016/10/08/mark-uraine-design-for-telepathy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2016: Design for Telepathy
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2016/06/06/mark-uraine-design-thinking-thinking-like-a-designer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2016: Design Thinking
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
