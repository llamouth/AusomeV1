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
    
    IF NEW.status = 'rejected' THEN
        
        DELETE FROM friends WHERE id = NEW.id;
    END IF;
    RETURN NULL; 
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_remove_rejected_friend_request
AFTER UPDATE ON friends
FOR EACH ROW
WHEN (NEW.status = 'rejected')
EXECUTE FUNCTION remove_rejected_friend_request();