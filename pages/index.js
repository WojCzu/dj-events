import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

const HomePage = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h2>No events to show</h2>}
      {events.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
      {events.length > 0 && (
        <Link href={"/events"} className={"btn-secondary"}>
          View All Events
        </Link>
      )}
    </Layout>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const res = await fetch(
    `${API_URL}/api/events?[populate]=*&sort=date:asc&pagination[start]=0&pagination[limit]=3`
  );
  const { data } = await res.json();
  return {
    props: { events: data },
  };
}
