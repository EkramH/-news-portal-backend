import News from "../models/News.js";

// Create News (protected)
export const createNews = async (req, res) => {
  try {
    const { title, description, content, imageUrl, category } = req.body;

    const news = await News.create({
      title,
      description,
      content,
      imageUrl,
      category,
      author: req.user._id,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All News
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single News by ID
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update News (only author)
export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, content, imageUrl, category } = req.body;

    news.title = title || news.title;
    news.description = description || news.description;
    news.content = content || news.content;
    news.imageUrl = imageUrl || news.imageUrl;
    news.category = category || news.category;

    const updatedNews = await news.save();

    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete News (only author)
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await news.deleteOne();

    res.json({ message: "News removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
