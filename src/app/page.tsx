import NameWithBlob from "@/components/NameWithBlob";

const EXTERNAL_LINK_CLASS = "text-white transition-colors hover:text-[#EEFF0D]";

export default function Home() {
  return (
    <main className="max-w-2xl py-24 pl-24">
      <div className="animate-fade-in-up">
        <NameWithBlob />

        <p className="mb-10 text-sm leading-relaxed text-zinc-400">
          Founder of{" "}
          <a
            href="https://lastpicked.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXTERNAL_LINK_CLASS}
          >
            Last Picked
          </a>
          , a product company where I use AI to learn, build, and iterate on
          ideas. I&apos;m also a Sr. Manager of Product Design at{" "}
          <a
            href="https://www.shopmonkey.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXTERNAL_LINK_CLASS}
          >
            Shopmonkey
          </a>
          . Previously, I led design teams at{" "}
          <a
            href="https://automattic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXTERNAL_LINK_CLASS}
          >
            Automattic
          </a>{" "}
          and{" "}
          <a
            href="https://wordpress.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXTERNAL_LINK_CLASS}
          >
            WordPress
          </a>
          , and helped several startups go from 0 to 1.
        </p>

        <p className="mb-10 text-sm leading-relaxed text-zinc-400">
          I built{" "}
          <a
            href="https://eatyourgreens.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXTERNAL_LINK_CLASS}
          >
            Eat Your Greens
          </a>{" "}
          for tracking food nutrients by color, and{" "}
          <a
            href="https://worduponword.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXTERNAL_LINK_CLASS}
          >
            Word Upon Word
          </a>{" "}
          to help English speakers learn Russian while reading the Bible.
          I&apos;ve also created a few{" "}
          <a
            href="https://mapk.gumroad.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXTERNAL_LINK_CLASS}
          >
            typefaces
          </a>{" "}
          and a{" "}
          <a
            href="https://www.figma.com/files/team/807785828270984885/resources/community/plugin/961268319224363191/sm-scaffold?fuid=951653566981120752"
            target="_blank"
            rel="noopener noreferrer"
            className={EXTERNAL_LINK_CLASS}
          >
            figma plugin
          </a>
          , along with authoring a few books.
        </p>
      </div>

      <section className="mt-12 animate-fade-in-up animate-fade-in-up-delay-1">
        <h2 className="mb-6 text-sm uppercase text-zinc-400">Projects</h2>
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href="https://tolkovanye.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              Tолкование
              <br />
              <span className="text-zinc-400">
                Read insightful commentary on Bible verses.
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://worduponword.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              Word Upon Word
              <br />
              <span className="text-zinc-400">
                Learn Russian through comprehensible input.
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://eatyourgreens.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              Eat Your Greens
              <br />
              <span className="text-zinc-400">
                Track food nutrients by color.
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://hewalkswith.us/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              He Walks With Us
              <br />
              <span className="text-zinc-400">
                Access books and articles with Hebraic context.
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://v0-yeshua-timeline.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              Yeshua&apos;s Purpose
              <br />
              <span className="text-zinc-400">
                Follow a timeline leading to the promised Messiah.
              </span>
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-12 animate-fade-in-up animate-fade-in-up-delay-2">
        <h2 className="mb-6 text-sm uppercase text-zinc-400">Talks</h2>
        <ul className="space-y-1 text-sm">
          <li>2023: ECHOS Design Leadership Firesession</li>
          <li>
            <a
              href="https://wordpress.tv/2020/05/30/mark-uraine-gutenberg-and-how-its-disrupting-wordpress/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2020: Disrupting Innovation
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/watch?v=8R8x7Oj9f5w"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2019: Disrupting Innovation
            </a>
          </li>
          <li>
            <a
              href="https://wordpress.tv/2019/09/08/mark-uraine-designing-in-the-open-remotely/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2019: Designing in the Open, Remotely
            </a>
          </li>
          <li>
            <a
              href="https://wordpress.tv/2019/09/05/panel-growing-beyond-gutenberg-from-block-based-editing-to-site-administration/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2019: Panel Discussions: Growing Beyond Gutenberg
            </a>
          </li>
          <li>
            <a
              href="https://wordpress.tv/2018/08/17/mark-uraine-designing-with-the-api-p1-of-3/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2018: Designing with the API
            </a>
          </li>
          <li>
            <a
              href="https://europe.wordcamp.org/2017/session/workshop-visual-data-using-the-wordpress-api/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2017: Visual Data Using the WordPress API
            </a>
          </li>
          <li>
            <a
              href="https://speakerdeck.com/mapk/visual-data-plus-computational-design"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2017: Visual Data + Computational Design
            </a>
          </li>
          <li>
            <a
              href="https://wordpress.tv/2017/05/09/mark-uraine-designing-in-the-open/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2017: Designing in the Open
            </a>
          </li>
          <li>
            <a
              href="https://wordpress.tv/2016/10/08/mark-uraine-design-for-telepathy/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2016: Design for Telepathy
            </a>
          </li>
          <li>
            <a
              href="https://wordpress.tv/2016/06/06/mark-uraine-design-thinking-thinking-like-a-designer/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              2016: Design Thinking
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-12 animate-fade-in-up animate-fade-in-up-delay-3">
        <ul className="space-y-1 text-sm">
          <li>
            <a
              href="https://www.linkedin.com/in/uraine/"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mapk"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://codepen.io/mapk"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              Codepen
            </a>
          </li>
          <li>
            <a
              href="https://adplist.org/mentors/mark-uraine"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              ADPList
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
