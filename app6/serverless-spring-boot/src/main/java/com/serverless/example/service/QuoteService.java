package com.serverless.example.service;


import com.serverless.example.repository.entity.Quote;

import java.util.List;

public interface QuoteService {
    List<Quote> listAllQuotes();

    Quote getQuoteById(String id);

    void createQuote(Quote quoteForm);

    void updateQuote(String id, Quote quote);

    void deleteQuote(String id);
}
