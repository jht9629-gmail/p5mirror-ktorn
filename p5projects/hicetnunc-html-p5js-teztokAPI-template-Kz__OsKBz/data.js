// **************************
// *      TEZTOK API        *
// **************************

function checkViewerIsOwner(data) {
  if (data.holdings.some((e) => e.holder_address === viewerData)) {
    console.log(`🦄 viewer IS owner`);
    viewerIsOwner = true;
  } else {
    console.log(`🦆 viewer is NOT owner`);
  }
  OBJKTdata = data;
  console.log({ OBJKT: data });
}

const query = `
  query Objkt($id: String!) {
    tokens_by_pk(fa2_address: "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton", token_id: $id) {
      artifact_uri
      artist_profile {
        user_address
        name
      }
      description
      display_uri
      token_id
      mime_type
      assets
      attributes
      burned_editions
      contributors
      creators
      current_price_to_first_sales_price_diff
      current_price_to_first_sales_price_pct
      current_price_to_highest_sales_price_diff
      current_price_to_highest_sales_price_pct
      current_price_to_last_sales_price_diff
      current_price_to_last_sales_price_pct
      current_price_to_lowest_sales_price_diff
      current_price_to_lowest_sales_price_pct
      editions
      external_uri
      first_sales_price
      formats
      highest_offer_price
      highest_sales_price
      is_verified_artist
      last_processed_event_id
      last_processed_event_level
      last_processed_event_timestamp
      last_sale_at
      last_sales_price
      lowest_price_listing
      lowest_sales_price
      metadata_uri
      mint_price
      minted_at
      name
      platform
      price
      right_uri
      rights
      royalties
      royalties_total
      sales_count
      sales_volume
      symbol
      thumbnail_uri
      updated_at
      tags {
        tag
      }
      listings(where: {}, order_by: {swap_id: asc}) {
        price
        status
        amount
        amount_left
        created_at
        seller_profile {
          user_address
          name
        }
      }

      events(order_by: {timestamp: asc}, where: {type: {_eq: "HEN_COLLECT"}}) {
        timestamp
        amount
        buyer_profile {
          user_address
          name
        }
        seller_profile {
          user_address
          name
        }
        type
        price
      }

      holdings(where: {amount: {_gt: "0"}}) {
        holder_address
        holder_profile {
          user_address
          name
        }
        amount
      }

    }
  }
`;

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch("https://teztok.teia.rocks/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

async function fetchData(objktId) {
  const { errors, data } = await fetchGraphQL(query, "Objkt", {
    id: "" + objktId,
  });
  if (errors) {
    console.error(errors);
  }

  const result = data.tokens_by_pk;
  OBJKTdata = result;
  return result;
}
