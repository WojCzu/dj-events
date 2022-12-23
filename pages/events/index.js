import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL } from "@/config/index";

const EVENTS_PER_PAGE = 5;

const EventsPage = ({ events, pagination }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
      <Pagination {...pagination} />
    </Layout>
  );
};

export default EventsPage;

export async function getServerSideProps({ query: { page } }) {
  const currentPage = +page || 1;
  const startPage = (currentPage - 1) * EVENTS_PER_PAGE;
  const res = await fetch(
    `${API_URL}/api/events?[populate]=*&sort=date:asc&pagination[start]=${startPage}&pagination[limit]=${EVENTS_PER_PAGE}`
  );
  const { data, meta } = await res.json();
  return {
    props: {
      events: data,
      pagination: {
        ...meta.pagination,
        currentPage,
      },
    },
  };
}
