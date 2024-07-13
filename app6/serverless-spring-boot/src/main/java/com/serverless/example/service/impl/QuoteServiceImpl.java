package com.serverless.example.service.impl;


import com.serverless.example.repository.dao.QuoteDao;
import com.serverless.example.repository.entity.Quote;
import com.serverless.example.service.QuoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class QuoteServiceImpl implements QuoteService {

    @Autowired
    private QuoteDao quoteDao;


    @Override
    public List<Quote> listAllQuotes() {
        return quoteDao.findAll();
    }

    @Override
    public Quote getQuoteById(String id) {

        return quoteDao.findById(id).get();
    }

    @Override
    public void createQuote(Quote quote) {
        quoteDao.save(quote);
    }

    @Override
    public void updateQuote(String id, Quote quote) {
        if (quoteDao.findById(id).get().getId() == quote.getId()) {
            quoteDao.save(quote);
        } else {
            log.error("Trying to update with invalid quote id {}", id);
        }
    }

    @Override
    public void deleteQuote(String id) {
        quoteDao.deleteById(id);
    }
}
