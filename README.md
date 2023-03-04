# Calendar

- [Calendar](#calendar)
  - [Introduction](#introduction)
  - [Tech Stack](#tech-stack)
  - [Salient Features](#salient-features)
  - [Run Application](#run-application)
  - [Run Tests](#run-tests)

## Introduction

This project aims to showcase the development of a production grade project. We are building an utility to return calendar for respective month for given input date. We have used `Express` as back-end library and web server using `JavaScript`. We aim not to use any external library for any purpose except very native standard libraries. We have written unit-tests using standard `jasmine` library.

The application accepts a date string in `YYYY-MM-DD` format and returns a calendar for that month filled with previous and/or next month dates to fulfill a `7x6` matrix.

For example, for the input `2022-01-31` , the calendar representation is below:

```text
    S       M       T       W       T       F       S
    26     27      28       29      30      31      1
    2       3       4       5       6       7       8
    9       10      11      12      13      14      15
    16      17      18      19      20      21      22
    23      24      25      26      27      28      29
    30      31      1       2       3       4        5
```

## Tech Stack

1. JavaScript as programming language
2. Express for api development and web server
3. Docker to containerize the application

## Salient Features

1. The above date matrix is `7x6`
2. 100% unit test coverage

Python version of this project [Calendar-Python](https://github.com/ashu-tosh-kumar/Calendar-Python)

## Run Application

1. Install Docker along with Docker Compose
2. `docker compose build`
3. `docker compose up -d`

## Run Tests

1. Working directory required: `Calendar-Python`
2. Run `npm test`
