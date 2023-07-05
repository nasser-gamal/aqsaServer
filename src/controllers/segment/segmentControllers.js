import * as segmentServices from '../../services/segment/segmentServices.js';

export const addSegment = async (req, res, next) => {
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

export const updateSegment = async (req, res, next) => {
  try {
    const data = req.body;
    const { segmentId } = req.params;

    const { message } = await segmentServices.updateSegment(segmentId, data);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const deleteSegment = async (req, res, next) => {
  try {
    const { segmentId } = req.params;

    const { message } = await segmentServices.deleteSegment(segmentId);
    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};

export const getAllSegments = async (req, res, next) => {
  try {
    const { segments } = await segmentServices.findAllSegments();
    return res.status(200).json(segments);
  } catch (err) {
    return next(err);
  }
};

export const getSegment = async (req, res, next) => {
  try {
    const { segmentId } = req.params;

    const { segment } = await segmentServices.findSegmentById(segmentId);
    return res.status(200).json({ segment });
  } catch (err) {
    return next(err);
  }
};
