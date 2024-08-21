\c ausome_dev;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_rejected_friend_request()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the status is 'rejected'
    IF NEW.status = 'rejected' THEN
        -- Delete the friend request
        DELETE FROM friends WHERE id = NEW.id;
    END IF;
    RETURN NULL; -- Since the row is deleted, return NULL to avoid further processing.
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger for posts table
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger for comments table
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_remove_rejected_friend_request
AFTER UPDATE ON friends
FOR EACH ROW
WHEN (NEW.status = 'rejected')
EXECUTE FUNCTION remove_rejected_friend_request();