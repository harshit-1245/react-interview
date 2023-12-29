const asyncHandler = require("express-async-handler");
const Movie = require("../models/movie");
const moviesData = require("../movieData/movie.json");

const getMovies = asyncHandler(async (req, res) => {
  try {
    let page = parseInt(req.query.page) - 1 || 0; // Default page is 0 if not provided
    let limit = parseInt(req.query.limit) || 5; // Default limit is 5 if not provided
    const search = req.query.search || "";
    let sort = req.query.sort || "rating"; // Default sort by 'rating' if not provided
    let genre = req.query.genre || "All"; // Default genre is 'All' if not provided

    // Available genre options
    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];

    // Parsing 'genre' based on query or using all genres
    genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.genre.split(","));

    // Parsing 'sort' parameter
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    // Creating 'sortBy' object for sorting
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc"; // Default sorting order is 'asc' if not provided
    }

    // Fetching movies based on criteria
    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Counting total matching documents for pagination
    const total = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: "false",
      total,
      page: page + 1, // Adding 1 to page number for user-friendly display
      limit,
      genre: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});



module.exports = { getMovies };
