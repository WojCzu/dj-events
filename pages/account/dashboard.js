import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "@/styles/Dashboard.module.css";

const DashboardPage = ({ events, jwt }) => {
  const router = useRouter();
  const handleDelete = async id => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error?.message || "Something Went Wrong");
        return;
      }
      router.replace(router.asPath);
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h2>My Events</h2>
        {events.map(event => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={() => handleDelete(event.id)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { jwt } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me?[populate]=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const { data } = await res.json();
  return {
    props: {
      events: data,
      jwt,
    },
  };
}
