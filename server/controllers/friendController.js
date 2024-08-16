import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';

const friendRequestsCollection = collection(db, 'friendRequests');

export async function sendFriendRequest(req, res) {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
      return res.status(400).json({ error: 'Missing senderId or receiverId' });
    }

    const newRequest = await addDoc(friendRequestsCollection, { senderId, receiverId, status: 'pending' });
    res.status(201).json({ id: newRequest.id });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'Failed to send friend request' });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { requestId } = req.body;
    if (!requestId) {
      return res.status(400).json({ error: 'Missing requestId' });
    }

    const requestRef = doc(db, 'friendRequests', requestId);
    await updateDoc(requestRef, { status: 'accepted' });
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'Failed to accept friend request' });
  }
}

export async function rejectFriendRequest(req, res) {
  try {
    const { requestId } = req.body;
    if (!requestId) {
      return res.status(400).json({ error: 'Missing requestId' });
    }

    const requestRef = doc(db, 'friendRequests', requestId);
    await updateDoc(requestRef, { status: 'rejected' });
    res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    res.status(500).json({ error: 'Failed to reject friend request' });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    const q = query(friendRequestsCollection, where('receiverId', '==', userId), where('status', '==', 'pending'));
    const snapshot = await getDocs(q);
    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error getting friend requests:', error);
    res.status(500).json({ error: 'Failed to get friend requests' });
  }
}

export default {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
};