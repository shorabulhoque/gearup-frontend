"use client";

import { useState } from "react";
import { Star, Send, Loader2 } from "lucide-react";
import { createReviewAction } from "@/services/review/review.actions";

interface CreateReviewFormProps {
    gearItemId: string;
    token: string;
}

export default function CreateReviewForm({ gearItemId, token }: CreateReviewFormProps) {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setLoading(true);
        setMessage(null);

        const res = await createReviewAction({ gearItemId, rating, comment }, token);

        setLoading(false);

        if (res.success) {
            setMessage({ type: "success", text: "Thank you! Your review has been submitted." });
            setComment("");
        } else {
            setMessage({ type: "error", text: res.message || "Failed to submit review." });
        }
    };

    return (
        <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-sm mb-8 transition-colors">
            <h3 className="text-xl font-bold text-foreground mb-2">Write a Review</h3>
            <p className="text-sm text-text-muted mb-4">
                Share your experience renting this gear to help other outdoor enthusiasts.
            </p>

            {message && (
                <div
                    className={`p-3.5 mb-4 rounded-xl text-sm font-medium ${message.type === "success"
                            ? "bg-success/10 text-success border border-success/20"
                            : "bg-danger/10 text-danger border border-danger/20"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating Stars Picker */}
                <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase">
                        Your Rating
                    </label>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-1 text-warning transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star
                                    className={`w-6 h-6 ${star <= (hoverRating || rating)
                                            ? "fill-warning text-warning"
                                            : "text-card-border fill-card-border"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment Input */}
                <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase">
                        Your Review
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What did you like or dislike about this gear?"
                        className="w-full rounded-xl bg-background border border-card-border p-3.5 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-colors resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !comment.trim()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-md active:scale-95"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Submit Review
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}