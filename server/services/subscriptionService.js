import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import stripe from '../config/stripe.js';

/* GET SUBSCRIPTION TIER */
export async function getUserSubscriptionTier(userId) {
  try {
    const userDoc = doc(db, 'users', userId);
    const userSnap = await getDoc(userDoc);

    if (!userSnap.exists()) {
      throw new Error('User not found');
    }

    if (!userData.subscriptionId) {
      return 'free';
    }

    const subscription = await stripe.subscriptions.retrieve(userData.subscriptionId);
    const priceId = subscription.items.data[0].price.id;

    if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
      return 'premium';
    }

    return 'free';
  } catch (error) {
    console.error('Error getting user subscription tier:', error);
    return null;
  }
}

/* UPDATE SUBSCRIPTION ID */
export async function updateUserSubscriptionId(userId, subscriptionId) {
  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, {
      subscriptionId: subscriptionId,
    });
  } catch (error) {
    console.error('Error updating user subscription ID:', error);
  }
}

export default {
  getUserSubscriptionTier,
  updateUserSubscriptionId,
};