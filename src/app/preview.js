"use client"; // Correct declaration for client-side rendering in Next.js

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getClient } from "./lib/contentful";

export default function Preview({ item }) {
  const router = useRouter();

  // Effect to handle redirection if no item is found
  useEffect(() => {
    if (!item) {
      router.push("/"); // Redirects to the home page if the item is not found
    }
  }, [item, router]);

  // Display loading state if item is still being fetched
  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h1 style={{ color: "pink", fontSize: "50px" }}>{item.fields.title}</h1>
        <p>{item.fields.description}</p>
      </div>
    </div>
  );
}

// Server-side rendering for fetching content from Contentful
export async function getServerSideProps(context) {
  const { entry } = context.query; // Extract entry ID from the URL query parameters

  // If entry is missing, return a null item
  if (!entry) {
    return { props: { item: null } };
  }

  const client = getClient(true); // Use the preview client for fetching draft content

  try {
    // Fetch the entry data from Contentful
    const item = await client.getEntry(entry);

    // Return the fetched item as props to the component
    return {
      props: { item },
    };
  } catch (error) {
    console.error("Error fetching entry from Contentful:", error);
    return {
      props: { item: null }, // Return null if an error occurs during fetching
    };
  }
}

// "useClient";

// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { getClient } from "./lib/contentful";

// export default function Preview({ item }) {
//   const router = useRouter();

//   useEffect(() => {
//     if (!item) {
//       router.push("/");
//     }
//   }, [item, router]);

//   if (!item) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <div>
//         <h1 style={{ color: "pink", fontSize: "50px" }}>Hello World</h1>
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps(context) {
//   const { entry } = context.query;

//   if (!entry) {
//     return { props: { item: null } };
//   }

//   const client = getClient(true);
//   const item = await client.getEntry(entry);

//   return {
//     props: { item },
//   };
// }
