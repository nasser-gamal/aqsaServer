const segmentServices = require('../../services/segment/segmentServices');

exports.addSegment = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = 7;
    // const userId = req.user.id;

    const { message } = await segmentServices.createSegment(userId, data);
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.updateSegment = async (req, res, next) => {
  try {
    const data = req.body;
    const { segmentId } = req.params;

    const { message } = await segmentServices.updateSegment(segmentId, data);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.deleteSegment = async (req, res, next) => {
  try {
    const { segmentId } = req.params;

    const { message } = await segmentServices.deleteSegment(segmentId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

exports.getAllSegments = async (req, res, next) => {
  try {
    const { segments } = await segmentServices.findAllSegments();
    return res.status(200).json(segments);
  } catch (err) {
    return next(err);
  }
};

exports.getSegment = async (req, res, next) => {
  try {
    const { segmentId } = req.params;

    const { segment } = await segmentServices.findSegmentById(segmentId);
    return res.status(200).json({ segment });
  } catch (err) {
    return next(err);
  }
};
