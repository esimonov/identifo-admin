import React from 'react';
import usersIcon from './user.svg';
import plusIcon from './plus-white.svg';
import Button from '~/components/shared/Button';
import './UsersPlaceholder.css';

const UsersPlaceholder = () => {
  return (
    <div className="iap-section-placehoder">
      <h2 className="iap-section-placeholder__title">
        Users
      </h2>

      <img
        alt="users"
        src={usersIcon}
        className="iap-section-placeholder__icon"
      />

      <p className="iap-section-placeholder__msg">
        No users have been added to your applications.
      </p>

      <Button>
        <img
          alt="add"
          src={plusIcon}
          className="iap-section-placeholder__add-icon"
        />
        <span className="iap-section-placeholder__btn-text">
          Create your first user
        </span>
      </Button>
    </div>
  );
};

export default UsersPlaceholder;