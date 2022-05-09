import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WrapWithLink from './WrapWithLink';

type Item = {
  id: number;
  title: string;
  created_at: string;
  user: {
    display_name: string;
    id: number;
  }
  content: string;
}

type DisplayItemsProps = {
  fetchUrl: string;
  shouldLink: boolean;
  linkUrl?: string;
  dataType: 'posts' | 'comments';
  shouldShowContent: boolean;
  className?: string;
  commentAdded?: boolean;
  setCommentAdded?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DisplayItems<T extends Item>({ fetchUrl, shouldLink=false, linkUrl, dataType, shouldShowContent, className, commentAdded, setCommentAdded }: DisplayItemsProps) {
  const [items, setItems] = useState<T[]>([]);
  const [nextPage, setNextPage] = useState(1);
  const [finalPage, setFinalPage] = useState(0);
  const [pageReset, setPageReset] = useState(false);
  
  async function getItems(page: number) {
    try {
      const itemsResponse = await axios.get(fetchUrl + `?page=${page}`);
      const newItems = itemsResponse.data[dataType];
      setItems(prevItems => Array.from(new Set([...prevItems, ...newItems])));

      const {per_page, total_entries} = itemsResponse.data.meta;
      setFinalPage(Math.ceil(total_entries / per_page));
      setNextPage(prevPage => prevPage + 1);
    } 
    catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getItems(nextPage);
  }, []);

  useEffect(() => {
    if ((dataType === 'comments') && commentAdded) {
      setItems(Array.from(new Set([])));
      setNextPage(1);
      setFinalPage(0);        
      setPageReset(true);
      setCommentAdded && setCommentAdded(false);
    }
  }, [commentAdded]);

  useEffect(() => {
    if ((dataType === 'comments') && pageReset) {
      getItems(nextPage);
      setPageReset(false);
    }
  }, [pageReset])

  return (
    <div>
      <ul className={`${className}`}>
        {items.map(item => {
          return (
          <li key={item.id} className="border-t border-gray-200 mt-5 pt-5 last:border-b last:pb-5">
            <WrapWithLink fullLinkUrl={`${linkUrl}${item.id}`} shouldLink={shouldLink}>
              {shouldShowContent && <div>{item.content}</div>}
              <div>{item.title} <span className='text-gray-500'>by {item.user.display_name} on {`${new Date(item.created_at)}`}</span></div>
            </WrapWithLink>
          </li>
        )})}
      </ul>
      { nextPage <= finalPage && <button onClick={() => getItems(nextPage)} className="mt-8 px-7 py-2 bg-green-400 rounded-md flex items-center disabled:bg-slate-50 disabled:text-slate-500 my-10">{`Get more ${dataType === "posts" ? "posts" : "comments"}`}</button>}
    </div>
  );
}
