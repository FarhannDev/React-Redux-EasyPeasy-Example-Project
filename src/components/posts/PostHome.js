import React from "react";
import Box from "../box/Box";
import BoxTitle from "../box/BoxTitle";
import BoxSubheading from "../box/BoxSubheading";
import PostFeed from "./PostFeed";
import SearchPost from "./SearchPost";
import SearchResult from "./SearchResult";
import Loading from "../shared/Loading";
import Message from "../shared/Message";
import Button from "../shared/Button";
import { useStoreState } from "easy-peasy";

export default function PostHome({ isLoading, fetchError }) {
  const posts = useStoreState((state) => state.posts);
  const searchPost = useStoreState((state) => state.searchPost);
  const searchResults = useStoreState((state) => state.searchResults);

  return (
    <>
      {fetchError && <Loading title={fetchError} />}
      {isLoading && !fetchError && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <Box>
          <div className="mx-md-2 mb-3">
            <BoxTitle title="POSTINGAN SAYA" />
            {posts.length >= 1 && (
              <BoxSubheading
                title={`${posts.length + " postingan ditulis"} `}
              />
            )}
            <SearchPost posts={posts} title="Cari semua postingan..." />
            <Button
              name="Buat postingan baru"
              urlRedirect="/post"
              icon="fas fa-2x fa-pencil-alt"
            />
          </div>

          {!searchPost && !posts.length && (
            <Message message="Belum ada postingan." />
          )}
          {!searchPost && <PostFeed posts={posts} />}
          {searchPost && <SearchResult result={searchResults} />}
        </Box>
      )}
    </>
  );
}
