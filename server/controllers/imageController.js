import userModel from "../models/userModel.js";
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.userId; // assuming set by auth middleware

        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: 'No Credits Left',
                creditBalance: user.creditBalance
            });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(), // ✅ include content-type
                    'x-api-key': process.env.CLIPDROP_API
                },
                responseType: 'arraybuffer'
            }
        );

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $inc: { creditBalance: -1 } },
            { new: true }
        );

        res.json({
            success: true,
            message: "Image Generated!",
            creditBalance: updatedUser.creditBalance,
            resultImage
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
