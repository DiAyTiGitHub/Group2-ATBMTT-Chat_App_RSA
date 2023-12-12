import React, { memo, useState } from 'react';
import './ConversationSearch.css';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';

function ConversationSearch() {
  const { chatStore } = useStore();
  const { searchConversation } = chatStore;
  
  const [searchKeyword, setSearchKeyword] = useState();

  function handleChange(event: any) {
    const { value } = event.target;
    setSearchKeyword(value);
    handleSearch(value);
  }

  function handleSearch(keyword: string) {
    searchConversation(keyword);
  }

  function handleOnKeyDown(event: any) {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === "Enter") {
      // Your code to handle Enter key press goes here
      handleSearch(searchKeyword);
    }
  }

  return (
    <div className="conversation-search w-100">
      <input
        type="text"
        className="conversation-search-input"
        placeholder="Search Messages"
        value={searchKeyword}
        onChange={handleChange}
        onKeyDown={handleOnKeyDown}
      />
    </div>
  );
}


export default memo(observer(ConversationSearch));