package com.serverless.example.repository.dao;

import com.serverless.example.repository.entity.Quote;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@Profile("!test")
@EnableScan
public interface QuoteDao extends CrudRepository<Quote, String> {

    List<Quote> findAll();
}
