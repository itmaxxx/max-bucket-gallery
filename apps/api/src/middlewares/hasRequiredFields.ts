import { Request, Response, NextFunction } from 'express';

const getEmptyRequiredFileds = (body: string[], requiredFields: string[]) => {
  const presentFields = Object.keys(body).filter(
    (k) => requiredFields.indexOf(k) !== -1
  );
  return requiredFields.filter((f) => presentFields.indexOf(f) === -1);
};

export const hasRequiredFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const emptyRequiredFields = getEmptyRequiredFileds(
      req.body,
      requiredFields
    );
    if (emptyRequiredFields.length) {
      res.status(400).json({
        error: 'Required fields are missing: ' + emptyRequiredFields.join(', '),
      });
    } else {
      next();
    }
  };
};
