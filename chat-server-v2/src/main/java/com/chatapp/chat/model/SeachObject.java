package com.chatapp.chat.model;

public class SeachObject {
    private int pageSize;
    private int pageIndex;
    private String keyword;

    public SeachObject() {
    }

    public SeachObject(int pageSize, int pageIndex, String keyword) {
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.keyword = keyword;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
}
