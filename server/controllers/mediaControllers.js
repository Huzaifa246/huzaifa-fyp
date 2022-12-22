const Media = require("../models/Media");

// get API of media file
exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();

    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Backend-URL => /public/videos/file_name.mp4

exports.create = async (req, res) => {
    const {name} = req.body;
    let videosPaths = [];

    // folder where vids will coming from
    if(Array.isArray(req.files.videos) 
    && req.files.videos.length > 0){
        // render multiple videos in a loop
        for(let video of req.files.videos){
            videosPaths.push('/' + video.path)
        }
    } 

    try{
        const createMedia = await Media.create({
            name, 
            videos: videosPaths
        })

        res.status(200).json(createMedia)
    } catch(error){
        console.log(error);
        res.status(400).json(error)
    }
};
