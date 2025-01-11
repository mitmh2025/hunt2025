import os
import jwt


def mint_admin_token():
    return jwt.encode(
        {
            "adminUser": "loadtest@example.com",
        },
        os.environ["JWT_SECRET"],
        algorithm="HS256",
        headers={"kid": "hunt"},
    )
