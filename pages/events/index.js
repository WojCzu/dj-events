import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

const EventsPage = ({ events }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
};

export default EventsPage;

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return {
    props: { events },
  };
}
