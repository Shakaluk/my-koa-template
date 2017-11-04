'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const isAdmin = require('./is-admin');
const CONSTANTS = require('../../../../constants');

describe('is admin method', () => {
    it('should check if user is admin and call next', async function (done) {
        const nextStub = this.sandbox.stub().returnsWithResolve(done());

        const ctx = {
            state: {
                user: {
                    role: CONSTANTS.USER_ROLES.ADMIN
                }
            }
        };

        try {
            await isAdmin(ctx, nextStub);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.calledOnce(nextStub);
    });

    it('should return unauthorized for not admin user', async function (done) {
        const nextStub = this.sandbox.stub().returnsWithResolve(done());

        const ctx = {
            state: {
                user: {
                    role: CONSTANTS.USER_ROLES.USER
                }
            }
        };

        try {
            await isAdmin(ctx, nextStub);
        } catch (err) {
            expect(err).to.not.exist;
        }

        sinon.assert.notCalled(nextStub);
    });
});