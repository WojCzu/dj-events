import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";

const SearchPage = ({ events }) => {
  const router = useRouter();
  return (
    <Layout title={"Search Results"}>
      <Link href={"/events"}>{"<"} Go back</Link>
      <h1>Search Results for {router.query.term}:</h1>
      {events.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
};

export default SearchPage;

export async function getServerSideProps({ query: { term } }) {
  const query = QueryString.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $containsi: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },
          {
            venue: {
              $containsi: term,
            },
          },
        ],
      },
    },
    { encode: false }
  );
  const res = await fetch(
    `${API_URL}/api/events?[populate]=*&sort=date:asc&${query}`
  );
  const events = await res.json();
  return {
    props: { events: events.data },
  };
}
